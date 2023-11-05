export async function async (req,res)  {
    const users = 
    const tumUserlar = await User.find({});
    return res.status(200).send(users);
    return res.json(tumUserlar);
}