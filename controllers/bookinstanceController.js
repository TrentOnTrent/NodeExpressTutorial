const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { book_list } = require("./bookController");

exports.bookinstance_list = asyncHandler(async (req, res, next) => {
    const allBookInstances = await BookInstance.find().populate("book").exec();

    res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: allBookInstances
    });
});

exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id).populate("book").exec();
    if (bookInstance === null ){
        const err = new Error("BookInstance not found");
        err.status = 404;
        return next(err);
    }
    res.render("bookinstance_detail", 
        { title: "Book: ", bookinstance: bookInstance }
    );
});

exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
    const allBooks = await Book.find({}, "title").sort({ title: 1}).exec();
    res.render("bookinstance_form", { title: "Create Book Instance", book_list: allBooks });
});

exports.bookinstance_create_post = [
    body("book", "Book must be specified.").trim().isLength({ min: 1 }).escape(),
    body("imprint", "Imprint must be specified.").trim().isLength({ min: 1 }).escape(),
    body("status").escape(),
    body("due_back", "Invalid date").optional({values: "falsy"}).isISO8601().toDate(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        });
        if (!errors.isEmpty()) {
            const allBooks = await Book.find({}, "title").sort({ title: 1}).exec();
            res.render("bookinstance_form", { title: "Create Book Instance", bookinstance: bookInstance, errors: errors.array(), book_list: allBooks });
            return;
        } else {
            await bookInstance.save();
            res.redirect(bookInstance.url);
        }
})
];

exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
    const bookinstance = await BookInstance.findById(req.params.id).populate("book").exec();
    
    if (bookinstance === null){
        const err = new Error("Book Instance not found");
        err.status = 404;
        return next(err);
    }
    res.render("bookinstance_delete", {title: "Delete Book Instance", bookinstance: bookinstance})
});

exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
    await BookInstance.findByIdAndDelete(req.params.id);
    res.redirect("/catalog/bookinstances")
    
});

exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance update GET");
});

exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance update POST");
});