/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of role"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of role"
 *                                  permission:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  example: "62822e4ff68cdded54aa928d"
 *                                              title:
 *                                                  type: string
 *                                                  example: "title of permission"
 *                                              description:
 *                                                  type: string
 *                                                  example: "describe the permission"
 *
 */
/**
 * @swagger
 *  components :
 *      schemas :
 *          Role :
 *              type : object
 *              required :
 *                  -   title
 *                  -   description
 *              properties :
 *                  title :
 *                      type : string
 *                      description : title of role
 *                  description :
 *                      type : string
 *                      description : desc of role
 *                  permissions :
 *                      type : array
 *                      description : the permission id for role
 */

/**
 * @swagger
 *  components :
 *      schemas :
 *          EditRole :
 *              type : object
 *              properties :
 *                  title :
 *                      type : string
 *                      description : title of role
 *                  description :
 *                      type : string
 *                      description : desc of role
 *                  permissions :
 *                      type : array
 *                      description : the permission id for role
 */

/**
 * @swagger
 *  /admin/role/list :
 *      get :
 *          tags : [RBAC(AdminPanel)]
 *          summary : get the list of roles
 *          description : get the list of roles
 *          responses :
 *              200 :
 *                  description : success - get all roles
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/ListOfRoles'
 */

/**
 * @swagger
 *  /admin/role/create :
 *      post :
 *          tags : [RBAC(AdminPanel)]
 *          summary : add a new role
 *          requestBody :
 *              required : true
 *              content :
 *                  application/x-www-form-urlencoded :
 *                      schema :
 *                          $ref : '#/components/schemas/Role'
 *                  application/json :
 *                      schema :
 *                          $ref : '#/components/schemas/Role'
 *          responses :
 *              201 :
 *                  description : created - a new role
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/ListOfRoles'
 */

/**
 * @swagger
 *  /admin/role/delete/{field} :
 *      delete :
 *          tags : [RBAC(AdminPanel)]
 *          summary : delete role with id or title
 *          description : delete role with id or title
 *          parameters :
 *              -   in : path
 *                  name : field
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success - delete role successfully
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/ListOfRoles'
 *
 */

/**
 * @swagger
 *  /admin/role/update/{id} :
 *      patch :
 *          tags : [RBAC(AdminPanel)]
 *          summary : update role with id
 *          description : update role with id
 *          parameters :
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          requestBody :
 *              required : true
 *              content :
 *                  application/x-www-form-urlencoded :
 *                      schema :
 *                          $ref : '#/components/schemas/EditRole'
 *                  application/json :
 *                      schema :
 *                          $ref : '#/components/schemas/EditRole'
 *          responses :
 *              200 :
 *                  description : success - update role successfully
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/ListOfRoles'
 */
