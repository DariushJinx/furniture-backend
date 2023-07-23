/**
 * @swagger
 *  components :
 *      schemas :
 *          GetOtp :
 *              type : object
 *              required :
 *                  -   mobile
 *              properties :
 *                  mobile :
 *                      type : string
 *                      description : the user mobile for signup/signin
 *          CheckOtp :
 *              type : object
 *              required : true
 *                  -   mobile
 *                  -   code
 *              properties :
 *                  mobile :
 *                      type : string
 *                      description : the user mobile for signup/signin
 *                  code :
 *                      type : integer
 *                      description : receive code from get otp
 *          RefreshToken :
 *              type : object
 *              required : true
 *                  -   refreshToken
 *              properties :
 *                  refreshToken :
 *                      type : string
 *                      description : enter the refresh token to get new token and refresh token
 */

/**
 * @swagger
 *  /user/get-otp :
 *      post :
 *          tags : [User-Authentication]
 *          summary : login user in panel with phone number
 *          description : one time password(OTP) login
 *          requestBody :
 *              required : true
 *              content :
 *                  application/x-www-form-urlencoded :
 *                      schema :
 *                          $ref : '#/components/schemas/GetOtp'
 *                  application/json :
 *                      schema :
 *                          $ref : '#/components/schemas/GetOtp'
 *          responses :
 *              201 :
 *                  description : Success - Created
 *              400 :
 *                  description : Bad Request
 *              401 :
 *                  description : UnAuthorization
 *              500 :
 *                  description : Internal Server Error
 */

/**
 * @swagger
 *  /user/check-otp :
 *      post :
 *          tags : [User-Authentication]
 *          summary : check otp value in user controller
 *          description : check otp code mobile with expires
 *          requestBody :
 *              required : true
 *              content :
 *                  application/x-www-form-urlencoded :
 *                      schema :
 *                          $ref : '#/components/schemas/CheckOtp'
 *                  application/json :
 *                      schema :
 *                          $ref : '#/components/schemas/CheckOtp'
 *          responses :
 *              200 :
 *                  description : Success
 *              400 :
 *                  description : Bad Request
 *              401 :
 *                  description : UnAuthorization
 *              500 :
 *                  description : Internal Server Error
 */

/**
 * @swagger
 *  /user/refresh-token :
 *      post :
 *          tags : [User-Authentication]
 *          summary : send token and create new token and refreshToken
 *          description : create new token and refreshToken
 *          requestBody :
 *              required : true
 *              content :
 *                  application/x-www-form-urlencoded :
 *                      schema :
 *                          $ref : '#/components/schemas/RefreshToken'
 *                  application/json :
 *                      schema :
 *                          $ref : '#/components/schemas/RefreshToken'
 *          responses :
 *              200 :
 *                  description : success
 */
