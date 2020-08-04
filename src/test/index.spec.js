import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import app from "../../index";

chai.use(chaiHttp);

describe("TEST HOME PAGE ROUTE", () => {
  it("it should return Wonder Greeting", done => {
    chai.request(app)
      .get("/")
      .end((error, response) => {
        expect(response.body.message).to.be.equal(
          "Welcome to Wonder!!!"
        );
        done();
      });
  });
});
