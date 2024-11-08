import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';                                                                                           
 import Image from 'next/image';                                                                                                                                            
                                                                                                                                                                            
 interface RecipeDetails {                                                                                                                                                  
   title: string;                                                                                                                                                           
   image: string;                                                                                                                                                           
   summary: string;                                                                                                                                                         
   servings: number;                                                                                                                                                        
   readyInMinutes: number;                                                                                                                                                  
   nutrition: {                                                                                                                                                             
     nutrients: {                                                                                                                                                           
       name: string;                                                                                                                                                        
       amount: number;                                                                                                                                                      
     }[];                                                                                                                                                                   
   };                                                                                                                                                                       
   extendedIngredients: {                                                                                                                                                   
     id: number;                                                                                                                                                            
     original: string;                                                                                                                                                      
   }[];                                                                                                                                                                     
   analyzedInstructions: {                                                                                                                                                  
     steps: {                                                                                                                                                               
       number: number;                                                                                                                                                      
       step: string;                                                                                                                                                        
     }[];                                                                                                                                                                   
   }[];                                                                                                                                                                     
 }                                                                                                                                                                          
                                                                                                                                                                            
 export default async function RecipePage(props: { params: Promise<{ id: string }> }) {
   const params = await props.params;
   try {                                                                                                                                                                    
     const { id } = params; // params sollte bereits gewartet sein                                                                                                          
     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${id}`);                                                                                 
     const recipe: RecipeDetails = await response.json();                                                                                                                   
                                                                                                                                                                            
     if (!recipe) {                                                                                                                                                         
       return (                                                                                                                                                             
         <div className="container mx-auto px-4 py-8 max-w-4xl text-center">                                                                                                
           <Card>                                                                                                                                                           
             <CardContent className="p-8">                                                                                                                                  
               <h1 className="text-3xl font-bold text-red-600 mb-4">Recipe not found</h1>                                                                                   
               <p className="text-gray-700">Sorry, but the requested recipe could not be loaded.</p>                                                                        
             </CardContent>                                                                                                                                                 
           </Card>                                                                                                                                                          
         </div>                                                                                                                                                             
       );                                                                                                                                                                   
     }                                                                                                                                                                      
                                                                                                                                                                            
     return (                                                                                                                                                               
       <div className="container mx-auto px-4 py-8 max-w-4xl">                                                                                                              
         <Card className="w-full">                                                                                                                                          
           <CardHeader className="text-center">                                                                                                                             
             <CardTitle className="text-3xl md:text-4xl font-bold text-gray-800">                                                                                           
               {recipe.title}                                                                                                                                               
             </CardTitle>                                                                                                                                                   
           </CardHeader>                                                                                                                                                    
           <CardContent>                                                                                                                                                    
             <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">                                                                       
               <Image                                                                                                                                                       
                 src={recipe.image}                                                                                                                                         
                 alt={recipe.title}                                                                                                                                         
                 fill                                                                                                                                                       
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"                                                                                           
                 className="object-cover"                                                                                                                                   
                 priority                                                                                                                                                   
               />                                                                                                                                                           
             </div>                                                                                                                                                         
                                                                                                                                                                            
             <div                                                                                                                                                           
               className="prose prose-lg text-gray-700 mb-8"                                                                                                                
               dangerouslySetInnerHTML={{ __html: recipe.summary }}                                                                                                         
             />                                                                                                                                                             
                                                                                                                                                                            
             <div className="grid md:grid-cols-3 gap-4 mb-8 text-center">                                                                                                   
               <div className="bg-gray-100 p-4 rounded-lg">                                                                                                                 
                 <h3 className="font-semibold text-gray-600">Servings</h3>                                                                                                  
                 <p className="text-xl font-bold">{recipe.servings}</p>                                                                                                     
               </div>                                                                                                                                                       
               <div className="bg-gray-100 p-4 rounded-lg">                                                                                                                 
                 <h3 className="font-semibold text-gray-600">Preparation Time</h3>                                                                                          
                 <p className="text-xl font-bold">{recipe.readyInMinutes} minutes</p>                                                                                       
               </div>                                                                                                                                                       
               <div className="bg-gray-100 p-4 rounded-lg">                                                                                                                 
                 <h3 className="font-semibold text-gray-600">Calories</h3>                                                                                                  
                 <p className="text-xl font-bold">                                                                                                                          
                   {recipe.nutrition?.nutrients.find(n => n.name === "Calories")?.amount ?? 'N/A'} kcal                                                                     
                 </p>                                                                                                                                                       
               </div>                                                                                                                                                       
             </div>                                                                                                                                                         
                                                                                                                                                                            
             <div className="mb-8">                                                                                                                                         
               <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>                                                                                       
               <ul className="space-y-2 pl-5 list-disc">                                                                                                                    
                 {recipe.extendedIngredients.map((ingredient) => (                                                                                                          
                   <li key={ingredient.id} className="text-gray-700">                                                                                                       
                     {ingredient.original}                                                                                                                                  
                   </li>                                                                                                                                                    
                 ))}                                                                                                                                                        
               </ul>                                                                                                                                                        
             </div>                                                                                                                                                         
                                                                                                                                                                            
             <div>                                                                                                                                                          
               <h2 className="text-2xl font-bold text-gray-800 mb-4">Preparation</h2>                                                                                       
               <ol className="space-y-4 pl-5 list-decimal">                                                                                                                 
                 {recipe.analyzedInstructions[0]?.steps.map((step) => (                                                                                                     
                   <li key={step.number} className="text-gray-700">                                                                                                         
                     {step.step}                                                                                                                                            
                   </li>                                                                                                                                                    
                 ))}                                                                                                                                                        
               </ol>                                                                                                                                                        
             </div>                                                                                                                                                         
           </CardContent>                                                                                                                                                   
         </Card>                                                                                                                                                            
       </div>                                                                                                                                                               
     );                                                                                                                                                                     
   } catch (error) {                                                                                                                                                        
     return (                                                                                                                                                               
       <div className="container mx-auto px-4 py-8 max-w-4xl text-center">                                                                                                  
         <Card>                                                                                                                                                             
           <CardContent className="p-8">                                                                                                                                    
             <h1 className="text-3xl font-bold text-red-600 mb-4">Error loading recipe</h1>                                                                                 
             <p className="text-gray-700">Sorry, but the requested recipe could not be loaded.</p>                                                                          
           </CardContent>                                                                                                                                                   
         </Card>                                                                                                                                                            
       </div>                                                                                                                                                               
     );                                                                                                                                                                     
   }
 }           