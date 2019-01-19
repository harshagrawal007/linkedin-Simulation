router.put("/recruiterDashboard", passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log("inside user profile update ")
    //console.log(req.body.profile)
    try {
      const result = await User.updateOne(
        { _id: req.user.id },
        { $set: req.body.profile }
      )
      //   res.writeHead(200, {
      //     'Content-Type': 'text/plain'
      // })
      // res.end("success"); 
      res.sendStatus(200).end();
      console.log(result);
    }
    catch (err) {
      next(err);
      res.sendStatus(400).end();
    }
  });