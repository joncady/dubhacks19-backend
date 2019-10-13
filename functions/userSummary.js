exports.GetUserSummary = (id, summaryRef, res) => {
    summaryRef.where('id', '==', Number(id)).get()
        .then(snapshot => {
            if (snapshot.empty) {
                throw Error('No matching documents.');
            }
            let userSummary;
            snapshot.forEach(doc => {
                userSummary = doc.data();
            });
            if (!userSummary) {
                throw new Error();
            }
            res.json({
                summary: userSummary
            });
            return;
        })
        .catch(error => {
            res.status(404).send({
                status: "failure",
                message: "Summary not found for user!"
            });
            return;
        })

};