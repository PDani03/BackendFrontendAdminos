const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const db = require("./db")
const jwt = require("jsonwebtoken")
const app = express()

app.use(cors())
app.use(express.json())
const PORT = 3000

app.post("/api/register", async(req,res)=>{
    try {
        const {name, email, password, phone_number} = req.body

        const [users] = await db.query("SELECT id FROM users WHERE email=?",[email])
        if (users.length>0) return res.status(400).json({message:"ez az email cím már létezik!"})
        
        const hashedPw = await bcrypt.hash(password,10)
        await db.query("INSERT INTO users (name,email,password,phone_number,role) VALUES (?,?,?,?,0)",[name, email, hashedPw, phone_number])
        res.json({message:"sikeres regisztráció!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"szerverhiba"})
    }
})

app.post("/api/login", async(req,res)=>{
    try {
        const {email, password} = req.body

        const [users] = await db.query("SELECT * FROM users WHERE email=?",[email])
        if (users.length===0) return res.status(400).json({message:"helytelen email-cím vagy jelszó!"})
        const user = users[0]

        const correctPw = await bcrypt.compare(password, user.password)
        if (!correctPw) return res.status(400).json({message:"helytelen email-cím vagy jelszó!"})

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:"1h"})
        res.json({
            message:"sikeres bejelentkezés!",
            token:token,
            user:{
                id:user.id,
                name:user.name,
                role:user.role
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"szerverhiba"})
    }
})

app.post("/api/products", async(req,res)=>{
    try {
        const {name, description, price} = req.body

        const [products] = await db.query("SELECT id FROM products WHERE name=?",[name])
        if (products.length>0) return res.status(400).json({message:"ez a termék már létezik!"})
        
        await db.query("INSERT INTO products (name, description, price) Values (?,?,?)",[name, description, price])
        res.json({message:"sikeres feltöltés!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"szerverhiba"})
    }
})

app.get("/api/products", async(req,res)=>{
    try {
        const [products] = await db.query("SELECT * FROM products")
        res.json({
            message:"sikeres lekérés",
            products:products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"szerverhiba"})
    }
})

app.delete("/api/products", async(req,res)=>{
    try {
        const {id} = req.body

        await db.query("DELETE FROM products WHERE id=?",[id])
        
        res.json({message:"termék sikeresen ki törölve!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"szerverhiba"})
    }
})

app.post("/api/ordersUpload", async(req,res)=>{
    try {
        const {product_id, user_id} = req.body

        const [orders] = await db.query("SELECT * FROM orders WHERE product_id=? AND user_id=?",[product_id,user_id])
        
        if (orders.length>0) await db.query("UPDATE orders SET count=count+1 WHERE product_id=? AND user_id=?",[product_id,user_id])
        else await db.query("INSERT INTO orders (product_id,user_id,count) VALUES (?,?,1)",[product_id,user_id])
        
        res.json({message:"termék sikeresen hozzáadva a kosárhoz!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"szerverhiba"})
    }
})

app.post("/api/ordersList", async(req,res)=>{
    try {
        const {user_id} = req.body
        const [orders] = await db.query("SELECT * FROM orders WHERE user_id=?",[user_id])
        const products = []

        orders.forEach(async (order)=>{
            const [DBproducts] = await db.query("SELECT * FROM products WHERE id=?",[order.product_id])
            const DBproduct = DBproducts[0]
            products.push({product: DBproduct, count: order.count})
        })

        res.json({
            message:"sikeres lekérés",
            orders:products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"szerverhiba"})
    }
})

app.listen(PORT, ()=>{
    console.log(`a szerver elindult a ${PORT} porton`)
})