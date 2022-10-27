class Components
{
    to_replace
    element_classes
    component_icon_container
    component_icon

    constructor(to_replace,element_classes)
    {
        this.to_replace = to_replace
        this.element_classes = element_classes
    }

    create_component(awesome_classes)
    {
        this.component_icon_container = document.createElement('div')
        this.component_icon = document.createElement('i')

        awesome_classes.forEach(classname => this.component_icon.classList.add(classname) )

        this.component_icon_container.append(this.component_icon)
        this.component_icon_container.classList.add('component-container')

        this.element_classes.forEach(classname => this.component_icon_container.classList.add(classname) )

        this.to_replace.replaceWith(this.component_icon_container)
    }
}

class SearchBox extends Components
{
    show_state = false
    searchbox_container
    searchbar
    closebox_icon
    results_list

    constructor(to_replace,element_classes)
    {
        super(to_replace,element_classes)

        this.create_component()
    }

    create_component()
    {
        this.searchbox_container = document.createElement('div')
        this.closebox_icon = document.createElement('i')
        this.searchbar = document.createElement('input')
        this.results_list = document.createElement('div')

        let searchbox_searchbar_container = document.createElement('div')
        let glass_icon = document.createElement('i')
        let result_text = document.createElement('p')

        this.closebox_icon.classList.add('fa-solid','fa-circle-xmark','searchbox-component-close')
        this.closebox_icon.addEventListener('click',() => {

            this.searchbox_container.setAttribute('data-show',false)
            this.show_state = false
        })

        this.searchbar.type = 'text'
        this.searchbar.placeholder = 'Entrez votre recherche'

        glass_icon.classList.add('fa-solid','fa-magnifying-glass')

        searchbox_searchbar_container.classList.add('searchbox-searchbar-container','m-auto')
        searchbox_searchbar_container.append(this.searchbar,glass_icon)

        result_text.classList.add('results-title')
        result_text.append(document.createTextNode('Résultat(s) : ') )

        this.results_list.classList.add('searchbox-result-list')

        this.searchbox_container.append(this.closebox_icon,searchbox_searchbar_container,result_text,this.results_list)
        this.searchbox_container.id = 'searchbox-component'
        this.searchbox_container.classList.add('component')
        this.searchbox_container.setAttribute('data-show',this.show_state)

        document.body.append(this.searchbox_container)
    }

    show()
    {
        if(this.searchbox_container.getAttribute('data-show') == 'false')
        {
            this.searchbox_container.setAttribute('data-show',true)

            this.show_state = true
        }
    }

    is_showed()
    {
        return this.show_state
    }

    create_new_result(result)
    {
        let new_result = document.createElement('div')

        new_result.classList.add('searchbox-result-container')
        new_result.innerHTML = result
    }
}

class Chooser extends Components
{

}

// searchbar component
class SearchBar extends Components
{
    static s_searchbox = null

    searchbox = null

    constructor(to_replace,element_classes)
    {
        super(to_replace,element_classes)

        this.create_component(['fa-solid','fa-magnifying-glass'])

        this.component_icon_container.title = 'Faîtes une recherche sur le site'

        if(SearchBar.s_searchbox == null)
        {
            let element_to_replace = document.createElement('span')

            document.body.append(element_to_replace)

            this.searchbox = new SearchBox(element_to_replace,[])

            this.component_icon.addEventListener('click',() => {
                this.show_searchbox(this.searchbox)
            })

            SearchBar.s_searchbox = this.searchbox
        }
        else
        {
            this.component_icon.addEventListener('click',() => {

                this.show_searchbox(SearchBar.s_searchbox)
            })
        }
    }

    show_searchbox(searchbox)
    {
        if(!searchbox.is_showed() )
            searchbox.show()
    }
}

class LogoutButton extends Components
{
    constructor(to_replace,element_classes)
    {
        super(to_replace,element_classes)

        const logout_event = new CustomEvent('logout')

        this.create_component(['fa-solid','fa-power-off'])

        this.component_icon_container.title = 'Se déconnecter'
        this.component_icon.addEventListener('click',() => {

            window.dispatchEvent(logout_event)
        })
    }
}

class Terminal extends Components
{

}

class ThemeSwitcher extends Components
{
    chooser = null

    constructor(to_replace,element_classes)
    {
        super(to_replace,element_classes)

        this.create_component(['fa-solid','fa-palette'])

        this.component_icon_container.title = 'Choisir le thème'
        this.component_icon.addEventListener('click',this.show_theme_chooser)
    }

    show_theme_chooser()
    {

    }
}

// list of components and their associated classes
let components_map = new Map()

components_map
    .set('searchbar',SearchBar)
    .set('logout-btn',LogoutButton)
    .set('terminal',Terminal)
    .set('theme-switcher',ThemeSwitcher)

// create all components in the current page
export default function create_components()
{
    document.querySelectorAll('.component').forEach(component_element => {

        const component_element_classes = Array.from(component_element.classList)

        for(const component_element_class of component_element_classes)
        {
            if(components_map.has(component_element_class) )
            {
                new (components_map.get(component_element_class))(component_element,component_element_classes)

                break
            }
        }
    })
}













