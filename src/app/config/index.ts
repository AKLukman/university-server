import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_sceret: process.env.JWT_ACCESS_SECRETE,
  jwt_refresh_secrete: process.env.JWT_REFRESH_SECRETE,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPRIES_IN,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPRIES_IN,
  reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_API_SECRET,
}
