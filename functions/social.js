exports.GetSocialData = (socialRef, res) => {
    socialRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                throw Error('No matching documents.');
            }
            let socialData = [];
            snapshot.forEach(doc => {
                socialData.push(doc.data());
            });
            res.json({
                social: socialData
            });
            return;
        })
        .catch(error => {
            res.statusCode(404).json({
                status: "failure",
                message: "Social data not found!"
            });
            return;
        })
};