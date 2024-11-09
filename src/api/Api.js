import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gnbzazyzixgflrxtrdbg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduYnphenl6aXhnZmxyeHRyZGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0NzcxNjUsImV4cCI6MjA0NjA1MzE2NX0.CXGCVz5u--PukgWFPRCN5AlFQKCEA309qZWwKkY7c1I";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchProducts() {
  let { data: product, error } = await supabase.from("product").select("*");

  if (error) console.error("Error fetching products:", error);
  return product || [];
}
export async function fetchProductById(id) {
  let { data: product, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
  return product;
}
