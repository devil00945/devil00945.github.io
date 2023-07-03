const iphoneurl = "https://raw.githubusercontent.com/AliceLi1231/FileStorage/main/iphone14pro2022.json"
let iphoneImages = Array.from(document.querySelectorAll('[iphone-category="color"]'))
let iphoneButtonStorage = Array.from(document.querySelectorAll('[iphone-category="storage"]'))
let iphoneButtonSize = Array.from(document.querySelectorAll('[iphone-category="size"]'))

let iphonePic = document.getElementById("iphonepic")
let iphonePic2 = document.getElementById("iphonepic2")
let iphoneColorName = document.getElementById("iphonecolorname")
let iphoneTotalPrice = document.querySelector(".iphonetotalPrice")
let iphoneSelectedOptions = {};

let iphoneSelectedPicId = ""
let iphoneSelectedColorname = ""
let iphoneSelectedBtnGBId = ""
let iphoneSelectedBtnSizeId = ""




let iphone14proArray = []
let iphonexhr = new XMLHttpRequest()

function requestIphoneJson(uri) {
    iphonexhr.onload = function () {
        
        iphone14proArray = this.response
         


        iphoneButtonSize.forEach(button => {
            button.addEventListener("click", () => {
                const category = button.getAttribute("iphone-category")
                const name = button.getAttribute("iphone-name")
                if (button.classList.contains("selected")) {
                    button.classList.remove("selected")
                    delete iphoneSelectedOptions[category]
                    iphoneSelectedBtnSizeId = null
                }
                else {
                    if (iphoneSelectedBtnSizeId) {
                        let iphonePreviousSelectedBtnSize = document.getElementById(iphoneSelectedBtnSizeId)
                        iphonePreviousSelectedBtnSize.classList.remove("selected")
                        delete iphoneSelectedOptions[category]
                    }
                    button.classList.add("selected")
                    iphoneSelectedOptions[category] = name
                    iphoneSelectedBtnSizeId = button.id

                }
                updateTotalPrice()
                iphoneColorName.innerText = ""
            })
        })

        iphoneImages.forEach(image => {
            image.addEventListener("click", () => {
                const category = image.getAttribute("iphone-category")
                const name = image.getAttribute("iphone-name")
                if (image.classList.contains("selected")) {
                    image.classList.remove("selected")
                    delete iphoneSelectedOptions[category]
                    iphoneSelectedPicId = null;
                }
                else {
                    if (iphoneSelectedPicId) {
                        let iphonePreviousSelectedImage = document.getElementById(iphoneSelectedPicId)
                        iphonePreviousSelectedImage.classList.remove("selected")
                        delete iphoneSelectedOptions[category]
                    }
                    image.classList.add("selected")
                    iphoneSelectedOptions[category] = name
                    iphoneSelectedPicId = image.id

                    iphonePic.src = `./iphone14pro/${iphoneSelectedPicId}.jpg`
                    iphonePic2.src = `./iphone14pro/${iphoneSelectedPicId}2.jpg`
                }
                updateTotalPrice()

            })
        })

        iphoneButtonStorage.forEach(button => {
            button.addEventListener("click", () => {
                const category = button.getAttribute("iphone-category")
                const name = button.getAttribute("iphone-name")
                if (button.classList.contains("selected")) {
                    button.classList.remove("selected")
                    delete iphoneSelectedOptions[category]
                    iphoneSelectedBtnGBId = null
                }
                else {
                    if (iphoneSelectedBtnGBId) {
                        let iphonePreviousSelectedBtnStorage = document.getElementById(iphoneSelectedBtnGBId)
                        iphonePreviousSelectedBtnStorage.classList.remove("selected")
                        delete iphoneSelectedOptions[category]
                    }
                    button.classList.add('selected')
                    iphoneSelectedOptions[category] = name
                    iphoneSelectedBtnGBId = button.id

                }
                updateTotalPrice()

            })
        })



        function updateTotalPrice() {
            const iphoneSelectedSize = iphoneSelectedOptions["size"]
            const iphoneSelectedColor = iphoneSelectedOptions["color"]
            const iphoneSelectedStorage = iphoneSelectedOptions["storage"]

            if (iphoneSelectedSize && iphoneSelectedColor && iphoneSelectedStorage) {
                const iphoneFilteredProducts = iphone14proArray.filter(p => p.size === iphoneSelectedSize && p.color === iphoneSelectedColor && p.storage === iphoneSelectedStorage)
                if (iphoneFilteredProducts.length > 0) {
                    iphoneTotalPrice.innerText = "NT$" + iphoneFilteredProducts[0].price
                } else {
                    iphoneTotalPrice.innerText = "NT$"
                }
            }
            else if (iphoneSelectedSize && iphoneSelectedColor) {
                const iphoneFilteredProducts = iphone14proArray.filter(p => p.color === iphoneSelectedColor && p.size === iphoneSelectedSize)
                iphoneTotalPrice.innerText = "NT$" + iphoneFilteredProducts[0].price
            }
            else {
                iphoneTotalPrice.innerText = "NT$"
            }
            iphoneColorName.innerText = iphoneSelectedColor
        }


    }

    iphonexhr.open("GET", uri)
    iphonexhr.responseType = "json"
    iphonexhr.send()
}