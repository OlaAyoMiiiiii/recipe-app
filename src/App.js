import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';

const App = () => {
    const APP_ID = 'e5f2a4ad';
    const APP_KEY = 'e5bfd97b011331c70f09198377330b20';
    const [food_recipes, setfood_recipes] = useState([]);
    const [search_recipe, setSearch_recipe] = useState('');
    const [search_query, setSearch_Query] = useState('chicken');

    useEffect(() => {
        const getRecipesFunction = async () => {
            const response =await  fetch(
                `https://api.edamam.com/api/recipes/v2?q=${search_query}&app_id=${APP_ID}&app_key=${APP_KEY}&type=public`,{
                  headers: {
                    "Edamam-Account-User": "oladipupo206",
                  },
                }
                        );
                        const data =await  response.json();
            
                        setfood_recipes(data.hits);
        }
        getRecipesFunction()
        
    }, [search_query]);

    // const getRecipesFunction = async () => {
    //   try {
    //     const response = await fetch(
    //       `https://api.edamam.com/api/recipes/v2?q=${search_query}&app_id=${APP_ID}&app_key=${APP_KEY}&type=public`,{
    //         headers: {
    //           "Edamam-Account-User": "oladipupo206",
    //         },
    //       }
    //               );
    //               const data = await response.json();
      
    //               setfood_recipes(data.hits);
    //   }catch(e){
    //     setfood_recipes([]);
    //   }
        
    // };

    const updateSearchFunction = (e) => {
        setSearch_recipe(e.target.value);
    };

    const getSearchFunction = (e) => {
        e.preventDefault();
        setSearch_Query(search_recipe);
        setSearch_recipe('');
    };

    return (
        <div className="bg-blue-50 min-h-screen font-sans">
            <header className="bg-blue-500 py-4 text-white">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl 
                                   md:text-5xl lg:text-6xl
                                   font-extrabold tracking-tight">
                        <span className="block">GeeksforGeeks
                            Recipe Finder</span>
                    </h1>
                </div>
            </header>
            <div className="container mx-auto mt-8 p-4 
                            sm:px-6 lg:px-8">
                <form
                    onSubmit={getSearchFunction}
                    className="bg-white p-4 sm:p-6 
                               lg:p-8 rounded-lg shadow-md 
                               flex flex-col sm:flex-row items-center 
                               justify-center space-y-4 sm:space-y-0 
                               sm:space-x-4"
                >
                    <div className="relative justify-center flex-grow
                                    w-full sm:w-1/2">
                        <input
                            type="text"
                            name="search"
                            value={search_recipe}
                            onChange={updateSearchFunction}
                            placeholder="Search for recipes..."
                            className="w-full py-3 px-4 bg-gray-100 
                                       border border-blue-300 focus:ring-blue-500 
                                       focus:border-blue-500 rounded-full 
                                       text-gray-700 outline-none transition-colors 
                                       duration-200 ease-in-out focus:ring-2 
                                       focus:ring-blue-900 focus:bg-transparent 
                                       focus:shadow-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 focus:ring-2 
                        focus:ring-blue-900 text-white font-semibold py-3 px-6 
                        rounded-full transform hover:scale-105 transition-transform 
                        focus:outline-none focus:ring-offset-2 
                        focus:ring-offset-blue-700"
                    >
                        Search Recipe
                    </button>
                </form>
            </div>

            <div className="container mx-auto mt-8 p-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                lg:grid-cols-4 gap-4">
                    {food_recipes?.map((recipe,idx) => (
                        <RecipeCard key={recipe.recipe.label+idx} recipe={recipe.recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;