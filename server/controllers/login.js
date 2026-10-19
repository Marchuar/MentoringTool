const login = async (request, response, client) => {
    const db = client.db("MentoringTool");
    const collection = db.collection("users");
    console.log(request.body);
    const { email, password } = request.body;
    if (typeof email !== "string" || typeof password !== "string") {
        return response.status(400).json({ message: "Wrong login or password" });
    }
    const user = await collection.findOne({ email, password });
    if (!user) {
        response.status(400).json({ message: "Wrong login or password" });
    } else {
        let id = user._id.toString();
        response.json(id);
    }
};

module.exports = login;
