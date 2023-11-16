class SideBar{
    getPageFromSidebar = (page:string) =>{
        return cy.get('.oxd-main-menu').contains(page);
    }
    
}
export default SideBar;