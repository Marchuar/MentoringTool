const { ObjectId } = require("mongodb");

const formValue = async (request, response, client) => {
    console.log(request.body);
    const db = client.db("MentoringTool");
    const formCollection = db.collection("forms");

    if (!ObjectId.isValid(request.body.formID)) {
        return response.status(400).json({ message: "Invalid form id" });
    }
    const formValue = await formCollection
        .find({ _id: new ObjectId(request.body.formID) })
        .toArray();
    console.log(formValue[0]);
    response.json(formValue[0]);
};

module.exports = formValue;
