document.addEventListener('DOMContentLoaded', fetchData)

//fetch data from the API
function fetchData() {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then(response => response.json())
    .then(data => displayMeals(data))
}

function displayMeals(data) {
    const meals = data.meals
    let meal = meals.slice(0, 30)
    const ingredients = document.getElementById('ingredient')

    //style ul to have 3 columns
    ingredients.style.columns = "70px 4"
    console.log(ingredients)
    let list = document.createElement('li')
    
    
    //Display each ingredient on the page
    meal.forEach(element => {
        let list = document.createElement('li')
        list.textContent = element.strIngredient
        ingredients.append(list)
        list.classList.toggle("items")
        })
        
        //grab form from html for submit event listening
        const form = document.getElementById("form")
        form.addEventListener("submit", dispDescription)
        
        //grab p from html to display description
        const p =document.getElementById("p") 
        function dispDescription(e) {
            e.preventDefault()
            let input = e.target.text.value

            //Configure input to search ingredient
            for (let i of meal) {
                if (i.strIngredient.toLowerCase() === input.toLowerCase()) {
                    form.reset();
                    return p.innerText = i.strDescription

                } else if (input === "clear") {
                    form.reset();
                    return p.innerText = ""

                }else if (i.strIngredient.toLowerCase() !== input.toLowerCase()) {
                   p.innerText = `Sorry ${input} does not exist in our database \n Try another ingredient :-)`
               }              
            form.reset();
            }      
        }
}
