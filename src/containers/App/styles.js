export default {
    container: {
        height: '100%',
        display: 'flex',
        'flexDirection': 'column',
        'justifyContent': 'spaceBetween',
        'alignItems': 'stretch'
    }, 
    toolbar: {
        flex: '0 0 auto'
    },
    content: {
        'paddingTop': '1rem', 
        flex: '1 0 auto'
    }, 
    footer: {
        flex: '0 1 auto'
    }, 
    notifications: {
        "width": '100%',
        'position' : 'absolute',  
        'zIndex': '1500',
        'bottom': '2rem'
    }
}