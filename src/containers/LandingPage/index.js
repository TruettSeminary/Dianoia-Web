// React/Redux
import React from 'react'; 

// Design
import Button from 'md-components/CustomButtons/Button'; 
// style={{marginTop: 10 + 'rem'}}
class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis, magna ut euismod blandit, quam quam consectetur ex, eu imperdiet mauris elit id sapien. In eu fermentum diam. Cras ut est blandit, maximus elit ac, iaculis ante. Quisque molestie varius ex in rutrum. Donec imperdiet maximus fermentum. Aenean placerat felis at ipsum vehicula, in venenatis sapien pretium. Aliquam eget sem at ex auctor elementum. Phasellus at magna sed leo condimentum ornare.

Mauris gravida velit lectus, id euismod nunc ultricies eu. Integer rutrum justo mauris, non finibus dui sodales sit amet. Morbi sagittis vitae massa sed pellentesque. Nam iaculis auctor venenatis. Nulla posuere commodo sagittis. Cras ac risus venenatis, sagittis massa placerat, eleifend sapien. Vivamus vulputate condimentum eros id ultrices. Maecenas euismod ante turpis, venenatis vestibulum enim dignissim in. Fusce tempus ut elit a scelerisque. Sed sit amet elementum neque. Fusce pretium tempor vestibulum.

Aliquam auctor tellus quis ornare suscipit. Proin rutrum tellus metus, a blandit nibh varius sed. Mauris tincidunt orci eget enim venenatis vestibulum. Fusce at sem ante. Nullam imperdiet aliquet tortor et tristique. Nam nec sem velit. Etiam sit amet varius massa, in molestie leo. Sed et cursus eros, a hendrerit dolor. Pellentesque ac fringilla massa, nec porttitor leo.

Aliquam quis sem justo. Vestibulum sit amet posuere ante. Aenean vel ante ac mi commodo gravida. Fusce sollicitudin vitae arcu facilisis ullamcorper. Vestibulum ut aliquam libero. Nam posuere mi sit amet aliquam aliquet. Nam volutpat ante dictum risus maximus, eu pharetra mauris faucibus. Etiam in enim massa. Morbi dapibus condimentum nisi nec vehicula. Nam feugiat molestie massa, at efficitur nibh iaculis vel. Vivamus tempor varius lorem, in laoreet ipsum aliquam id. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin hendrerit felis in tristique. Pellentesque odio tellus, sagittis at tincidunt at, vulputate a justo. Aliquam commodo urna sit amet rutrum vehicula.

Etiam laoreet, risus eu facilisis sollicitudin, nibh justo pharetra purus, vitae scelerisque dui turpis a leo. Curabitur sodales leo id tellus commodo, eu mattis lorem condimentum. Vestibulum mattis eros et leo efficitur luctus a vitae mauris. Phasellus eget dui non orci tincidunt condimentum. Phasellus non sodales nibh. Duis nisl nunc, scelerisque ac justo quis, dapibus efficitur libero. In non blandit risus. Donec lorem magna, ultricies nec libero eu, consequat placerat odio.
                </div>
                <Button color="rose" onClick={()=>{
                    console.log(this.props.user); 
                }}>
                    Print User
                </Button>
            </div>
        );
    }
}

export default LandingPage; 