1. Add debounce method for search function. This allows large datasets to be searched without too much interference for the user.

2. Add loading states for api calls. This will show the user what's happening and not leave them wondering.

3. Add Error states for :
    - No search results found
    - API/network errors
    - Empty state/no data

4. Update typing:
    - create Advocate type
    - create types for Our API responses
    - filteredAdvocate state type
    - Search Props
    - Desktop table and mobile table props
    - replace all `any`s with correct types
    - enable strict: true in tsconfig.json
    - use `?` for optional properties

5. Add filtering:
    - Location radius
    - experience range
    - specific specialties

6. Pagination/infinite scroll for larger datasets
    - Could do server side pagination

7. Search auto complete/suggestions and or fuzzy search

8. Favorites/bookmarks (would need a whole user sign in/database)

9. ARIA labels and other things like keyboard navigation for disabled users (high contrast mode?)

10. Create global state with React Context API

11. Track user behaviors with google anylitics or the like. See what they do and don't use, what could be better

12. Error logging. 