const deleteMenti = async (request, response, client) => {
    const db = client.db("MentoringTool");
    const collection = db.collection("mentis");
    console.log(request.body);
    await collection.findOneAndUpdate(
        {
            name: request.body.item.split(" ")[0],
            surname: request.body.item.split(" ")[1],
        },
        { $set: { assignedTo: "" } }
    );
    response.json({ ok: true });
};

module.exports = deleteMenti;
