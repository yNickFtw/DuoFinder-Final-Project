import { Admin } from "../models/admin.model";
import { CreateAdminDTO } from "../models/admin.model";

class AdminRepository {
  async createAdmin(admin: CreateAdminDTO) {
    return await Admin.create(admin);
  }

  async findAdminByName(adminName: string) {
    return await Admin.findOne({ admin: adminName });
  }

  async findAdminById(id: string) {
    return await Admin.findById(id).select("-password");
  }
}

export default new AdminRepository();
