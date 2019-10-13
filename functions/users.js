exports.GetUserProfile = (id, usersRef, res) => {
    usersRef.where('id', '==', Number(id)).get()
        .then(snapshot => {
            if (snapshot.empty) {
                throw Error('No matching documents.');
            }
            let userProfile;
            snapshot.forEach(doc => {
                userProfile = doc.data();
            });
            if (!userProfile) {
                throw new Error();
            }
            res.json({
                user: userProfile
            });
            return;
        })
        .catch(error => {
            res.status(404).send({
                status: "failure",
                message: "User not found!"
            });
            return;
        })
}