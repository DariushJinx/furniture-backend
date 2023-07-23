const { StatusCodes: HttpStatus } = require("http-status-codes");
const Controller = require("../controller");

class Home extends Controller {
  async indexPage(req, res, next) {
    try {
      res.status(HttpStatus.OK).send({
        StatusCode: HttpStatus.OK,
        data: {
          message: "صفحه اصلی سایت",
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

const HomeController = new Home();
module.exports = HomeController;
