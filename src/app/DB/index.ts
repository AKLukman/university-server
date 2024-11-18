import config from '../config'
import { USER_ROLE } from '../modules/user/user.constant'
import { User } from '../modules/user/user.model'

const superUser = {
  id: '0001',
  email: 'abulkashemlukman@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
}

const seedSuperAdmin = async () => {
  // super admin exists or not
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin })
  if (!isSuperAdminExits) {
    await User.create(superUser)
  }
}
export default seedSuperAdmin
