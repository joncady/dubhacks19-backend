exports.MealsGetAPI = (mealsRef, res) => {
  mealsRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        throw Error('No matching documents.');
      }

      let mealsMorning = [];
      let mealsLunch = [];
      let mealsNight = [];

      snapshot.forEach(doc => {
        let meal = doc.data();
        if (meal.type === "morning") {
          mealsMorning.push(meal);
        } else if (meal.type === "lunch") {
          mealsLunch.push(meal);
        } else {
          mealsNight.push(meal);
        }
      });

      res.send({
        meals: {
          mealsMorning,
          mealsLunch,
          mealsNight
        }
      });
      return;
    })
    .catch(error => {
      res.status(500).send({
        message: "Error getting meals!"
      });
      return;
    });
};