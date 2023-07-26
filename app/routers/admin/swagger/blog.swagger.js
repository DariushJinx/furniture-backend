/**
 * @swagger
 *  components :
 *      schemas :
 *          AddBlog :
 *              type : object
 *              required :
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties :
 *                  title :
 *                      type : string
 *                      description : the title of blog
 *                  text :
 *                      type : string
 *                      description : the text of blog
 *                  short_text :
 *                      type : string
 *                      description : the short_text of blog
 *                  tags :
 *                      type : string
 *                      description : the list of tags for blog-example(tag1#tag2)
 *                  category :
 *                      type : string
 *                      description : the id of category for foreignField in blog
 *                  image :
 *                      type : file
 *                      description : the index picture of blog
 *
 *          EditBlog :
 *              type : object
 *              properties :
 *                  title :
 *                      type : string
 *                      description : the title of blog
 *                  text :
 *                      type : string
 *                      description : the text of blog
 *                  short_text :
 *                      type : string
 *                      description : the short_text of blog
 *                  tags :
 *                      type : string
 *                      description : the list of tags for blog-example(tag1#tag2)
 *                  category :
 *                      type : string
 *                      description : the id of category for foreignField in blog
 *                  image :
 *                      type : file
 *                      description : the index picture of blog
 */

/**
 * @swagger
 *  /admin/blogs :
 *      get :
 *          tags : [Blog(AdminPanel)]
 *          summary : get all blogs
 *          responses :
 *              200 :
 *                  description : success
 */

/**
 * @swagger
 *  /admin/blogs/add :
 *      post :
 *          tags : [Blog(AdminPanel)]
 *          summary : create new blog
 *          requestBody :
 *              required : true
 *              content :
 *                  multipart/form-data :
 *                      schema :
 *                          $ref : '#/components/schemas/AddBlog'
 *          responses :
 *              201 :
 *                  description : create - created new blog
 */

/**
 * @swagger
 *  /admin/blogs/{id} :
 *      get :
 *          tags : [Blog(AdminPanel)]
 *          summary : get one blog with id
 *          parameters :
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success - get one blog
 */

/**
 * @swagger
 *  /admin/blogs/{id} :
 *      delete :
 *          tags : [Blog(AdminPanel)]
 *          summary : delete on blog with id
 *          parameters :
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success - delete blog
 */

/**
 * @swagger
 *  /admin/blogs/update/{id} :
 *      patch :
 *          tags : [Blog(AdminPanel)]
 *          summary : update blog with id
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
 *                          $ref : '#/components/schemas/EditBlog'
 *          responses :
 *              200 :
 *                  description : success - blog updated
 */
