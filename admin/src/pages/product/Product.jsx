import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { useSelector, useDispatch } from "react-redux"
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";


export default function Product() {
    const location = useLocation()
    const productId = location.pathname.split("/")[2]
    const [pstats, setPstats] = useState([])
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState([])
    const [size, setSize] = useState([])
    const [color, setColor] = useState([])
    const dispatch = useDispatch()

    const product = useSelector(state => state.product.products.find(product => product._id === productId))

    const months = useMemo(
        () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"], []
    )

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/orders/income?pid=" + productId)
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                // console.log(list);
                list.map(item => (
                    setPstats(prev => [
                        ...prev,
                        { name: months[item._id - 1], Sales: item.total }
                    ])
                ))
            } catch (err) { }
        }
        getStats()
        // console.log(pstats);
    }, [productId, months])

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleCat = (e) => {
        setCat(e.target.value.split(","))
    }
    const handleColor = (e) => {
        setColor(e.target.value.split(","))
    }
    const handleSize = (e) => {
        setSize(e.target.value.split(","))
    }

    const handleClick = (e) => {
        e.preventDefault()
        const fileName = new Date().getTime() + file.name
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        // console.log('Upload is paused');
                        break;
                    case 'running':
                        // console.log('Upload is running');
                        break;
                    default:

                }
            },
            (error) => {
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = { ...inputs, img: downloadURL, categories: cat, color, size };
                    updateProduct(product, dispatch)
                });
            }
        )
    }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pstats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={product.title} onChange={handleChange} />
                        <label>Product Description</label>
                        <input type="text" placeholder={product.desc} onChange={handleChange} />
                        <label>Color</label>
                        <input type="text" placeholder={product.color} onChange={handleColor} />
                        <label>Categories</label>
                        <input type="text" placeholder={product.category} onChange={handleCat} />
                        <label>Size</label>
                        <input type="text" placeholder={product.size} onChange={handleSize} />
                        <label>Price</label>
                        <input type="text" placeholder={product.price} onChange={handleChange} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock" onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>

                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
