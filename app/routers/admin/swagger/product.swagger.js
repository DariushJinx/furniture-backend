/**
 * @swagger
 *  components :
 *      schemas :
 *          Color :
 *              type : array
 *              items :
 *                  type : string
 *                  enum :
 *                      -   black
 *                      -   white
 *                      -   gray
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */

/**
 * @swagger
 *  components :
 *      schemas :
 *          AddProduct :
 *              type : object
 *              required :
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties :
 *                  title :
 *                      type : string
 *                      description : the title of product
 *                  text :
 *                      type : string
 *                      description : the text of product
 *                  short_text :
 *                      type : string
 *                      description : the short_text of product
 *                  tags :
 *                      type : array
 *                      description : the tags of product
 *                  category :
 *                      type : string
 *                      description : the id of category for product
 *                  price :
 *                      type : string
 *                      description : the price of product
 *                  discount :
 *                      type : string
 *                      description : the discount of product
 *                  count :
 *                      type : string
 *                      description : the count of product
 *                  images :
 *                      type : array
 *                      items :
 *                          type : string
 *                          format : binary
 *                  width :
 *                      type : string
 *                      description : the width of product
 *                      example: 0
 *                  length :
 *                      type : string
 *                      description : the length of product
 *                      example: 0
 *                  height :
 *                      type : string
 *                      description : the height of product
 *                      example: 0
 *                  weight :
 *                      type : string
 *                      description : the weight of product
 *                      example: 0
 *                  madeIn :
 *                      type : string
 *                      description : the madeIn of product
 *                  type :
 *                      type : string
 *                      description : the type of product
 *                      example: virtual-physical
 *                  colors :
 *                      $ref : '#/components/schemas/Color'
 */

/**
 * @swagger
 *  components :
 *      schemas :
 *          EditProduct :
 *              type : object
 *              properties :
 *                  title :
 *                      type : string
 *                      description : the title of product
 *                  text :
 *                      type : string
 *                      description : the text of product
 *                  short_text :
 *                      type : string
 *                      description : the short_text of product
 *                  tags :
 *                      type : array
 *                      description : the tags of product
 *                  category :
 *                      type : string
 *                      description : the id of category for product
 *                  price :
 *                      type : string
 *                      description : the price of product
 *                  discount :
 *                      type : string
 *                      description : the discount of product
 *                  count :
 *                      type : string
 *                      description : the count of product
 *                  images :
 *                      type : array
 *                      items :
 *                          type : string
 *                          format : binary
 *                  width :
 *                      type : string
 *                      description : the width of product
 *                      example: 0
 *                  length :
 *                      type : string
 *                      description : the length of product
 *                      example: 0
 *                  height :
 *                      type : string
 *                      description : the height of product
 *                      example: 0
 *                  weight :
 *                      type : string
 *                      description : the weight of product
 *                      example: 0
 *                  type :
 *                      type : string
 *                      description : the type of product
 *                      example: virtual-physical
 *                  colors :
 *                      $ref : '#/components/schemas/Color'
 */

/**
 * @swagger
 *  definitions :
 *      PublicDefinition :
 *          type : object
 *          properties :
 *              statusCode :
 *                  type : integer
 *                  example : 20x
 *              data :
 *                  type : object
 *                  properties :
 *                      message :
 *                          type : string
 *                          example : "the best message for action"
 */

/**
 * @swagger
 *  /admin/product/add :
 *      post :
 *          tags : [Product(AdminPanel)]
 *          summary : create new product
 *          requestBody :
 *              required : true
 *              content :
 *                  multipart/form-data :
 *                      schema :
 *                          $ref : '#/components/schemas/AddProduct'
 *          responses :
 *              201 :
 *                  description : create - product created
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/PublicDefinition'
 */

/**
 * @swagger
 *  /admin/product/list :
 *      get :
 *          tags : [Product(AdminPanel)]
 *          summary : get all products
 *          parameters :
 *              -   in : query
 *                  name : search
 *                  type : string
 *                  description : text for search in title text short_text
 *          responses :
 *              200 :
 *                  description : success - get all products
 */

/**
 * @swagger
 *  /admin/product/update/{id} :
 *      patch :
 *          tags : [Product(AdminPanel)]
 *          summary : update product with id
 *          parameters :
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          requestBody :
 *              required : true
 *              content :
 *                  multipart/form-data :
 *                      schema :
 *                          $ref : '#/components/schemas/EditProduct'
 *          responses :
 *              200 :
 *                  description : success - product updated
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/PublicDefinition'
 */

/**
 * @swagger
 *  /admin/product/{id} :
 *      get :
 *          tags : [Product(AdminPanel)]
 *          summary : get one product with id
 *          parameters :
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success - get one product
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/PublicDefinition'
 */

/**
 * @swagger
 *  /admin/product/remove/{id} :
 *      delete :
 *          tags : [Product(AdminPanel)]
 *          summary : delete product with id
 *          parameters :
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success - product removed
 *                  content :
 *                      application/json :
 *                          schema :
 *                              $ref : '#/definitions/PublicDefinition'
 */
