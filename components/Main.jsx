import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromChefClaude } from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        ["chicken", "all the main spices", "corn", "heavy cream", "pasta"]
    )
    const [recipe, setRecipe] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const recipeSection = React.useRef(null)

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            // recipeSection.current.scrollIntoView({behavior: "smooth"})
            const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
            window.scroll({
                top: yCoord,
                behavior: "smooth"
            })
        }
    }, [recipe])

    async function getRecipe() {
        setIsLoading(true)
        const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
        setRecipe(recipeMarkdown)
        setIsLoading(false)
    }

    function addIngredient(formData) {
        const rawIngredient = formData.get("ingredient")
        const newIngredient = rawIngredient.trim()

        if (!newIngredient) {
            // Ignore empty or whitespace-only submissions
            return
        }

        setIngredients(prevIngredients => {
            const exists = prevIngredients.some(
                ingredient => ingredient.toLowerCase() === newIngredient.toLowerCase()
            )

            if (exists) {
                // Already in the list; do not add again
                return prevIngredients
            }

            return [...prevIngredients, newIngredient]
        })
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    isLoading={isLoading}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}