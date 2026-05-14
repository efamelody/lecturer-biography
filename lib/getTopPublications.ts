// lib/getTopPublications.ts
export async function getTopPublications() {
  // Use his verified ORCID instead of the automated OpenAlex ID
  const orcidId = "0000-0003-2339-3321"; 
  const apiKey = process.env.OPENALEX_API_KEY;
  
  // Notice we changed the filter from 'authorships.author.id' to 'author.orcid'
  const res = await fetch(
    `https://api.openalex.org/works?filter=author.orcid:${orcidId}&sort=cited_by_count:desc&per_page=5&api_key=${apiKey}`,
    { next: { revalidate: 604800 } } 
  );
  
  if (!res.ok) return [];
  
  const data = await res.json();
  return data.results;
}