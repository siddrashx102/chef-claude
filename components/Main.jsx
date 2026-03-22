import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromChefClaude } from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")
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
        setError("")
        setIsLoading(true)
        try {
            const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
            setRecipe(recipeMarkdown)
        } catch (e) {
            setError("Sorry, something went wrong while generating your recipe. Please try again.")
        } finally {
            setIsLoading(false)
        }
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

            {ingredients.length > 0 ? (
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    isLoading={isLoading}
                />
            ) : (
                <p>
                    Start by adding a few ingredients you have on hand above.
                    Once you have at least four, Chef Claude will suggest a recipe.
                </p>
            )}

            {error && <p style={{ color: "crimson" }}>{error}</p>}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}