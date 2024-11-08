import { NextResponse } from 'next/server';                                                                                                                                
                                                                                                                                                                            
 export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
   const params = await props.params;
   try {                                                                                                                                                                    
     const { id } = params; // params sollte bereits gewartet sein                                                                                                          
                                                                                                                                                                            
     const response = await fetch(                                                                                                                                          
       `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`                                                        
     );                                                                                                                                                                     
                                                                                                                                                                            
     if (!response.ok) {                                                                                                                                                    
       return NextResponse.json(                                                                                                                                            
         { error: 'Rezept nicht gefunden' },                                                                                                                                
         { status: 404 }                                                                                                                                                    
       );                                                                                                                                                                   
     }                                                                                                                                                                      
                                                                                                                                                                            
     const recipe = await response.json();                                                                                                                                  
                                                                                                                                                                            
     return NextResponse.json(recipe);                                                                                                                                      
   } catch (error) {                                                                                                                                                        
     console.error('API Fehler:', error);                                                                                                                                   
     return NextResponse.json(                                                                                                                                              
       { error: 'Fehler beim Abrufen des Rezepts' },                                                                                                                        
       { status: 500 }                                                                                                                                                      
     );                                                                                                                                                                     
   }
 }               