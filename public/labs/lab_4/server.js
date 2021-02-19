function onLoad(){
    console.log('script loaded');
}

window.onload = onLoad;

app.route('/api')
.get(async(req,res) => {
    console.log('GET request detected');
    const data = await('https://data.princegeorgescountymd.gov/resource/vkdv-rvfx.json');
    const json = await data.json();
    console.log('data from fetch',json);
    res.json(json);
})
    .post(async(req,res) => {
        console.log('POST request detected');
        console.log('Form data in res.body',req.body);
        res.send('hello world');
        res.json({data: dataToSendToFrontEnd});
    })