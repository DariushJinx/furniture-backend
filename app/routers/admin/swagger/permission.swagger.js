/**
 * @swagger
 *  definitions :
 *      ListOfPermissions :
 *          type : object
 *          properties :
 *              statusCode :
 *                  type : integer
 *                  example : 200
 *              data :
 *                  type : object
 *                  properties :
 *                      permissions :
 *                          type : array
 *                          items :
 *                              type : object
 *                              properties :
 *                                  _id :
 *                                      type : string
 *                                      example: "64bd51ba05a6c9924d3c8429"
 *                                  title :
 *                                      type : string
 *                                      example: title of permission
 *                                  description :
 *                                      type : string
 *                                      example: desc of permission
 */

/**
 * @swagger
 *  components :
 *      schemas :
 *          Permission :
 *              type : object
 *              required :
 *                  -   name
 *                  -   description
 *              properties :
 *                  name :
 *                      type : string
 *                      description : the name of permission
 *                  description :
 *                      type : string
 *                      description : the desc of permission
 */

/**
 * @swagger
 *  components :
 *      schemas :
 *          EditPermission :
 *              type : object
 *              properties :
 *                  name :
 *                      type : string
 *                      description : the name of permission
 *                  description :
 *                      type : string
 *                      description : the desc of permission
 */

/**
 * @swagger
 *  /admin/permissions/list :
 *      get :
 *          tags : [RBAC(AdminPanel)]
 *          summary : get all permission
 *          description : get all permission
 *          responses :
 *              200 :
 *                  description : success - get all permission
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/ListOfPermissions'
 */

/**
 * @swagger
 *  /admin/permissions/create :
 *      post :
 *          tags : [RBAC(AdminPanel)]
 *          summary : create new permission
 *          description : create new permission
 *          requestBody :
 *              required : true
 *              content :
 *                  application/x-www-form-urlencoded :
 *                      schema :
 *                          $ref : '#/components/schemas/Permission'
 *                  application/json :
 *                      schema :
 *                          $ref : '#/components/schemas/Permission'
 *          responses :
 *              201 :
 *                  description : success - created
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/ListOfPermissions'
 */

/**
 * @swagger
 *  /admin/permissions/remove/{id} :
 *      delete :
 *          tags : [RBAC(AdminPanel)]
 *          summary : remove permission with id
 *          description : remove permission with id
 *          parameters :
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success - remove permission
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/ListOfPermissions'
 */

/**
 * @swagger
 *  /admin/permissions/update/{id} :
 *      patch :
 *          tags : [RBAC(AdminPanel)]
 *          summary : edit permission with id
 *          description : edit permission with id
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
 *                          $ref : '#/components/schemas/EditPermission'
 *                  application/json :
 *                      schema :
 *                          $ref : '#/components/schemas/EditPermission'
 *          responses :
 *              200 :
 *                  description : success - edit permission
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/ListOfPermissions'
 *
 */
