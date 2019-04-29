//封装操作localStorage本地存储的方法，相当于模块化的文件

var sessionStorage = {
	set(key,value){
		window.sessionStorage.setItem(key,JSON.stringify(value));
	},
	get(key){
		return JSON.parse(window.sessionStorage.getItem(key));
	},
	remove(key){
		window.sessionStorage.removeItem(key);
	}
}

export default sessionStorage;