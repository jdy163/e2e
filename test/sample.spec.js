describe("get todo", function () {
  let page;

  before(async function () {
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:7001/");
  });

  after(async function () {
    await page.close();
  });

  it("should get all todolist correct", async function () {
    let todoList = await page.waitFor("#todo-list");
    const length = await page.evaluate(
      (todoList) => todoList.children.length,todoList
    );
    expect(length).to.eql(3);
  });
});

describe("delete todo", function () {
  let page;

  before(async function () {
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:7001/");
  });

  after(async function () {
    await page.close();
  });
  it("should delete todo correctly", async function () {
    let todoList = await page.waitFor("#todo-list");
    const length_1 = await page.evaluate(
      (todoList) => todoList.children.length,todoList
    );
    await page.evaluate(() => {
      document.querySelector(".destroy").click();
    });
    await page.waitFor("#todo-list");
    const length_2 = await page.evaluate(
      (todoList) => todoList.children.length,todoList
    );
    expect(length_2).to.eql(length_1 - 1);
  });
});

