import { users, rates, type User, type InsertUser, type Rate, type InsertRate } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  authenticateUser(username: string, password: string): Promise<User | null>;
  
  getAllRates(): Promise<Rate[]>;
  getRateById(id: number): Promise<Rate | undefined>;
  createRate(rate: InsertRate): Promise<Rate>;
  updateRate(id: number, rate: Partial<InsertRate>): Promise<Rate | undefined>;
  deleteRate(id: number): Promise<boolean>;
  getRatesByCategory(category: string): Promise<Rate[]>;
  getRatesByStatus(status: string): Promise<Rate[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private rates: Map<number, Rate>;
  private currentUserId: number;
  private currentRateId: number;

  constructor() {
    this.users = new Map();
    this.rates = new Map();
    this.currentUserId = 1;
    this.currentRateId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const defaultUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin123",
    };
    this.users.set(defaultUser.id, defaultUser);

    // Create sample rates
    const sampleRates: Rate[] = [
      {
        id: this.currentRateId++,
        code: "RT001",
        name: "Standard Business Rate",
        category: "standard",
        baseRate: "45.00",
        multiplier: "1.25",
        status: "active",
        createdAt: new Date(),
      },
      {
        id: this.currentRateId++,
        code: "RT002",
        name: "Premium Service Rate",
        category: "premium",
        baseRate: "75.00",
        multiplier: "1.50",
        status: "active",
        createdAt: new Date(),
      },
      {
        id: this.currentRateId++,
        code: "RT003",
        name: "Enterprise Rate",
        category: "enterprise",
        baseRate: "120.00",
        multiplier: "2.00",
        status: "pending",
        createdAt: new Date(),
      },
    ];

    sampleRates.forEach(rate => {
      this.rates.set(rate.id, rate);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async getAllRates(): Promise<Rate[]> {
    return Array.from(this.rates.values());
  }

  async getRateById(id: number): Promise<Rate | undefined> {
    return this.rates.get(id);
  }

  async createRate(insertRate: InsertRate): Promise<Rate> {
    const id = this.currentRateId++;
    const rate: Rate = { 
      ...insertRate,
      status: insertRate.status || "active",
      id,
      createdAt: new Date(),
    };
    this.rates.set(id, rate);
    return rate;
  }

  async updateRate(id: number, rateData: Partial<InsertRate>): Promise<Rate | undefined> {
    const rate = this.rates.get(id);
    if (!rate) return undefined;
    
    const updatedRate: Rate = { ...rate, ...rateData };
    this.rates.set(id, updatedRate);
    return updatedRate;
  }

  async deleteRate(id: number): Promise<boolean> {
    return this.rates.delete(id);
  }

  async getRatesByCategory(category: string): Promise<Rate[]> {
    return Array.from(this.rates.values()).filter(rate => rate.category === category);
  }

  async getRatesByStatus(status: string): Promise<Rate[]> {
    return Array.from(this.rates.values()).filter(rate => rate.status === status);
  }
}

export const storage = new MemStorage();
