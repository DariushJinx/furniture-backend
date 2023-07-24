/**
 * @swagger
 *  components :
 *      schemas :
 *          Category :
 *              type : object
 *              required :
 *                  -   title
 *              properties :
 *                  title :
 *                      type : string
 *                      description : title of category
 *                  parent :
 *                      type : string
 *                      description : this id of parent category
 *
 */

/**
 * @swagger
 *  components :
 *      schemas :
 *          EditCategory :
 *              type : object
 *              properties :
 *                  title :
 *                      type : string
 *                      description : title of category
 *
 */

/**
 * @swagger
 *  /admin/category/add :
 *      post :
 *          tags : [Category(AdminPanel)]
 *          summary : create category
 *          requestBody :
 *              required : true
 *              content :
 *                  application/x-www-form-urlencoded :
 *                      schema :
 *                          $ref : "#/components/schemas/Category"
 *                  application/json :
 *                      schema :
 *                          $ref : "#/components/schemas/Category"
 *          responses :
 *              201 :
 *                  description : create - category created
 */

/**
 * @swagger
 *  /admin/category/remove/{id} :
 *      delete :
 *          tags : [Category(AdminPanel)]
 *          summary : delete category with id
 *          parameters :
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success - category removed
 */

/**
 * @swagger
 *  /admin/category/list :
 *      get :
 *          tags : [Category(AdminPanel)]
 *          summary : get all categories
 *          responses :
 *              200 :
 *                  description : success - get all categories
 */

/**
 * @swagger
 *  /admin/category/update/{id} :
 *      patch :
 *          tags : [Category(AdminPanel)]
 *          summary : update category with id
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
 *                          $ref : "#/components/schemas/EditCategory"
 *                  application/json :
 *                      schema :
 *                          $ref : "#/components/schemas/EditCategory"
 *          responses :
 *              200 :
 *                  description : success - category updated
 */

/**
 * @swagger
 *  /admin/category/parents :
 *      get :
 *          tags : [Category(AdminPanel)]
 *          summary : get all parents
 *          responses :
 *              200 :
 *                  description : success - get all parents
 */

/**
 * @swagger
 *  /admin/category/children/{parent} :
 *      get :
 *          tags : [Category(AdminPanel)]
 *          summary : get children of parent
 *          parameters :
 *              -   in : path
 *                  name : parent
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success - get children of parent
 */

/**
 * @swagger
 *  /admin/category/list-of-all :
 *      get :
 *          tags : [Category(AdminPanel)]
 *          summary : get all categories
 *          responses :
 *              200 :
 *                  description : success - get all categories
 */
