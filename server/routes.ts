import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, message: "Login successful" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = {
        revenue: "$124,563",
        revenueChange: "+12.5%",
        users: "2,847",
        usersChange: "+8.2%",
        conversion: "3.24%",
        conversionChange: "-2.1%",
        aov: "$89.42",
        aovChange: "+5.3%",
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Recent activity
  app.get("/api/dashboard/activity", async (req, res) => {
    try {
      const activities = [
        {
          id: 1,
          title: "New user registered",
          time: "2 minutes ago",
          type: "user",
        },
        {
          id: 2,
          title: "Order #1284 completed",
          time: "15 minutes ago",
          type: "order",
        },
        {
          id: 3,
          title: "Monthly report generated",
          time: "1 hour ago",
          type: "report",
        },
      ];
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Rate matrix routes
  app.get("/api/rates", async (req, res) => {
    try {
      const { category, status, search } = req.query;
      let rates = await storage.getAllRates();

      if (category) {
        rates = rates.filter(rate => rate.category === category);
      }

      if (status) {
        rates = rates.filter(rate => rate.status === status);
      }

      if (search) {
        const searchTerm = search.toString().toLowerCase();
        rates = rates.filter(rate => 
          rate.name.toLowerCase().includes(searchTerm) ||
          rate.code.toLowerCase().includes(searchTerm) ||
          rate.category.toLowerCase().includes(searchTerm)
        );
      }

      res.json(rates);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/rates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const rate = await storage.getRateById(id);
      
      if (!rate) {
        return res.status(404).json({ message: "Rate not found" });
      }

      res.json(rate);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/rates", async (req, res) => {
    try {
      const rate = await storage.createRate(req.body);
      res.status(201).json(rate);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/rates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const rate = await storage.updateRate(id, req.body);
      
      if (!rate) {
        return res.status(404).json({ message: "Rate not found" });
      }

      res.json(rate);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/rates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteRate(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Rate not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
