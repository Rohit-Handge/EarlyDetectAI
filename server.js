const express = require("express")
const session = require("express-session")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// Session configuration
app.use(
  session({
    secret: "healthcare-app-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
)

// View engine setup
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "HealthAI - Early Disease Detection" })
})

app.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign In", error: null })
})

app.post("/signin", (req, res) => {
  const { email, password } = req.body
  // Mock authentication
  if (email && password) {
    req.session.user = { email }
    res.redirect("/assessment")
  } else {
    res.render("signin", { title: "Sign In", error: "Invalid credentials" })
  }
})

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up", error: null })
})

app.post("/signup", (req, res) => {
  const { email, password, userType } = req.body
  // Mock registration
  if (email && password) {
    req.session.user = { email, userType }
    res.redirect("/assessment")
  } else {
    res.render("signup", { title: "Sign Up", error: "Invalid information" })
  }
})

app.get("/assessment", (req, res) => {
  res.render("assessment", {
    title: "Health Assessment",
    formData: req.session.formData || {},
  })
})

app.post("/assessment", (req, res) => {
  req.session.formData = req.body
  res.redirect("/dashboard")
})

app.get("/dashboard", (req, res) => {
  const formData = req.session.formData || {}
  res.render("dashboard", {
    title: "Risk Analysis Dashboard",
    formData,
  })
})

app.get("/recommendations", (req, res) => {
  const formData = req.session.formData || {}
  res.render("recommendations", {
    title: "Health Recommendations",
    formData,
  })
})

app.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect("/")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
