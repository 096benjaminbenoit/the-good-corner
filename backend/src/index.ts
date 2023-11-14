import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

let ads = [
    {
      id: 1,
      title: "Bike to sell",
      description:
        "My bike is blue, working fine. I'm selling it because I've got a new one",
      owner: "bike.seller@gmail.com",
      price: 100,
      picture:
        "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
      location: "Paris",
      createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
      id: 2,
      title: "Car to sell",
      description:
        "My car is blue, working fine. I'm selling it because I've got a new one",
      owner: "car.seller@gmail.com",
      price: 10000,
      picture:
        "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
      location: "Paris",
      createdAt: "2023-10-05T10:14:15.922Z",
    },
  ];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ads", (req, res) => {
    res.send(ads);
});

type Ad = {
    id: number,
    title: string,
    description: string,
    owner: string,
    price: number,
    picture: string,
    location: string,
    createdAt: string
}

app.post("/ad", (req, res) => {
    console.log(req.body);

    let maxId: number = ads.reduce((max, ad) => ad.id > max ? ad.id : max, 0);
    let newId: number = maxId + 1;
    let newAd: Ad  = { id: newId, ...req.body };
    ads.push(newAd);

    res.send("Request received, check the backend terminal");
});

app.delete("/ads/:id", (req, res) => {
    ads = ads.filter((ad) => req.params.id !== ad.id.toString());
    res.sendStatus(204);
})

app.patch("/ads/:id", (req, res) => {
    console.log("id of ad to update ", req.params.id);
    console.log("props to update ", req.body);
  
    ads = ads.map((ad) => {
      if (ad.id.toString() === req.params.id) return { ...ad, ...req.body };
      return ad;
    });
  
    res.send(ads.find((ad) => ad.id.toString() === req.params.id));
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});