import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    server: "bkc server",
    message: "Server is healthy and running",
    timestamp: new Date().toISOString()
  });
});

export default router;
