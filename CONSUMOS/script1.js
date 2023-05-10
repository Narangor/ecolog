function check_password(input_element) {

    //get value of input
    var password = input_element.value;

    //check value and show/hide the div
    if (password == '2022')
        document.getElementById('forms').style.display = 'block';
    else
        document.getElementById('forms').style.display = 'none';

}