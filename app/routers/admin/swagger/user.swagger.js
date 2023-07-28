/**
 * @swagger
 *  definitions :
 *      ListOfUsers :
 *          type : object
 *          properties :
 *              statusCode :
 *                  type : integer
 *                  example : 20X
 *              data :
 *                  type : object
 *                  properties :
 *                      message :
 *                          type : string
 *                          example : the best message for action
 *                      users :
 *                          type : array
 *                          items :
 *                              type : object
 *                              properties :
 *                                  _id :
 *                                      type : string
 *                                  first_name :
 *                                      type : string
 *                                  last_name :
 *                                      type : string
 *                                  username :
 *                                      type : string
 *                                  email :
 *                                      type : string
 *                                  mobile :
 *                                      type : string
 */

/**
 * @swagger
 *  components :
 *      schemas :
 *          UpdateProfile :
 *              type : object
 *              properties :
 *                  first_name :
 *                      type : string
 *                      description : first_name of user
 *                  last_name :
 *                      type : string
 *                      description : last_name of user
 *                  username :
 *                      type : string
 *                      description : username of user
 *                  email :
 *                      type : string
 *                      description : first_name of user
 *                  birthday :
 *                      type : string
 *                      description : first_name of user
 */

/**
 * @swagger
 *  components :
 *      schemas :
 *          UpdateRole :
 *              type : object
 *              required :
 *                  -   Role
 *              properties :
 *                  Role :
 *                      type : string
 *                      description : update role with id for users
 */

/**
 * @swagger
 *  /admin/users/list :
 *      get :
 *          tags : [Users(AdminPanel)]
 *          summary : get all users
 *          parameters :
 *              -   in : query
 *                  name : search
 *                  type : string
 *                  description : search user in first_name,last_name,username,email,mobile
 *          responses :
 *              200 :
 *                  description : success - get all users
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/ListOfUsers'
 */

/**
 * @swagger
 *  /admin/users/update-profile :
 *      patch :
 *          tags : [Users(AdminPanel)]
 *          summary : update user profile
 *          requestBody :
 *              required : true
 *              content :
 *                  application/x-www-form-urlencoded :
 *                      schema :
 *                          $ref : '#/components/schemas/UpdateProfile'
 *                  application/json :
 *                      schema :
 *                          $ref : '#/components/schemas/UpdateProfile'
 *          responses :
 *              200 :
 *                  description : success - user updated
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/ListOfUsers'
 */

/**
 * @swagger
 *  /admin/users/update-role :
 *      patch :
 *          tags : [Users(AdminPanel)]
 *          summary : update role for users
 *          requestBody :
 *              required : true
 *              content :
 *                  application/x-www-form-urlencoded :
 *                      schema :
 *                          $ref : '#/components/schemas/UpdateRole'
 *                  application/json :
 *                      schema :
 *                          $ref : '#/components/schemas/UpdateRole'
 *          responses :
 *              200 :
 *                  description : success - role updated
 */
