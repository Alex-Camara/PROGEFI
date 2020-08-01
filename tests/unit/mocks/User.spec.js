import User from "@/presentation/models/user.js";
const testUser1 = new User();

async function loadUserValues() {
  await testUser1.setUser({
    id: 1,
    name: "Alex"
  });
}

export { testUser1, loadUserValues };
