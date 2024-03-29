/**************************************************************************************/
const upload = (app,DB,fs,tesseract,uploadMulter,allowed_ip) => {

	/********************************************/
	app.post('/api/upload', uploadMulter.single('imagefile'), async (request, response) => {
		const remoteAddress = request.get("x-real-ip");
		if(global.Dev || remoteAddress.includes(allowed_ip)){
			//imagefile is the name of the formfield that has the image
			//multer can also take an array of files
			const tempPath = request.file.path;
			const file = '../kitchenExpress/uploads/for_ocr.jpg';

			fs.renameSync(tempPath, file);

			const Image = require('../classes/image');
			let image = new Image(DB);
			image.file = file;
			image.tesseract = tesseract;

			let promise = new Promise((resolve) => {
				let text_out = image.process();
				
				resolve(text_out);
			});
			
			let text = await promise;

			response.json({
				'text': text,
				'status': 'ok'
			});
		}
		else{
			response.json({'status': 'forbidden'});
		}
	});
	/********************************************/

}
/**************************************************************************************/

module.exports = upload;
