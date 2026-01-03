const express = require("express")
const router = express.Router()

// Landing page
router.get("/", (req, res) => {
  res.render("index", { title: "MediPredict AI" })
})

// Sign in page
router.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign In", error: null })
})

// Sign up page
router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up", error: null })
})

// Assessment page
router.get("/assessment", (req, res) => {
  res.render("assessment", { title: "Health Assessment" })
})

// Dashboard page
router.get("/dashboard", (req, res) => {
  // Get patient data from session
  const patientData = req.session.patientData || {}

  // Mock risk analysis data
  const riskData = {
    diabetes: { probability: 45, confidence: 87 },
    heartDisease: { probability: 32, confidence: 82 },
    hypertension: { probability: 58, confidence: 90 },
    stroke: { probability: 28, confidence: 78 },
    ckd: { probability: 15, confidence: 85 },
  }

  res.render("dashboard", { title: "Risk Analysis", riskData, patientData })
})

// Recommendations page
router.get("/recommendations", (req, res) => {
  res.render("recommendations", { title: "Recommendations" })
})

// Handle assessment form submission
router.post("/assessment/submit", (req, res) => {
  // Store patient data in session
  req.session.patientData = req.body
  res.redirect("/dashboard")
})

// Handle sign in
router.post("/signin", (req, res) => {
  const { email, password } = req.body
  // Mock authentication
  if (email && password) {
    req.session.user = { email }
    res.redirect("/assessment")
  } else {
    res.render("signin", { title: "Sign In", error: "Invalid credentials" })
  }
})

// Handle sign up
router.post("/signup", (req, res) => {
  const { email, password, userType } = req.body
  // Mock registration
  if (email && password) {
    req.session.user = { email, userType }
    res.redirect("/assessment")
  } else {
    res.render("signup", { title: "Sign Up", error: "Registration failed" })
  }
})

module.exports = router
