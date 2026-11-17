/* ======================================================
    Lab 8 - Header.jsx starter
====================================================== */

export default function Header({ title, searchTerm }) {
    /* TODO 12: Create the entire Header component.
    
       Requirements:
        - Show the title prop in an h1
        - Show a one-sentence description
        - Show the current search term somewhere in the header
        - Replace return null with your JSX
    */
    
        return (
        <div className="header">
            <h1>{title}</h1>
            <p>Search for your favorite movies and add them to your watchlist!</p>
            <p>Current search term: {searchTerm}</p>
        </div>
    );
}