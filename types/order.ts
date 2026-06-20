export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  amount: number;
  productId: string;
  createdAt: Date;
}
