$(document).ready(function () {
    getUsers();

   


    $('.add').click(() => {

        $fullname = $('.fullname').val();
        $email = $('.email').val();
        $work = $('.work').val();
        $img = $('.image').val();

        fetch('http://localhost:7000/user/add', {
            method: 'POST',
            body: JSON.stringify({
                fullname: $fullname,
                position: $work,
                email: $email,
                imgUrl: $img,
            }),
            // body: JSON.stringify($('form').serializeArray()),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        location.reload(true);
        // return false;
    })

    function getUsers() {
        fetch('http://localhost:7000/user')
            .then(response => {
                console.log(response);
                return response.json();
            }).then(data => {
                console.log(data);
                data.forEach(element => {
                    $('.data').append(`
                                <div class="col-lg-3 col-md-4 col-sm-12">
                               
                                    <div class="card product_item" style="box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;">
                                        <div class="body">
                                            <div class="cp_img">
                                                <img src="${element.imgUrl}" alt="Product" style="height:200px;width:225px;">
                                                <div class="hover">
                                                <button type="button" onClick="editStudent('${element._id}')" class="btn btn-primary btn-sm waves-effect editBtn"data-toggle="modal" data-target="#updateModal"><i class="fa fa-pencil-square-o" style="font-size:15px"></i>
                                                </button>
                                                <button onClick="deleteStudent('${element._id}')" class="btn btn-danger btn-sm waves-effect deletes" ><i class="fa fa-trash" style="font-size:15px"></i> </button>
                                                </div>
                                            </div>
                                            <div class="product_details">
                                                <h5 class="text-center">${element.fullname}</h5>
                                                <p class="mt-2"><b>Position:</b>  ${element.position}</p>
                                                <p style="margin-top:-18px;"><b>Email:</b>  ${element.email}</p>
                                            </div>
                                        </div>
                                    </div>
                               
                            </div>`)

                });

            }).catch(error => {
                console.log(error);
            });
    }

    window.deleteStudent = function (id) {
        if (confirm('Do you really want to delete this data?')) {
            var parent = $(this).parent().parent();
            $.ajax({
                type: "DELETE",
                url: "http://localhost:7000/user/" + id,
                cache: false,
                success: function () {

                    location.reload(true)
                },
                error: function () {
                    alert('Error deleting record');
                }
            });
        }
    }



    window.editStudent = function (id) {
        fetch(`http://localhost:7000/user/${id}`)
            .then(res => res.json())
            .then((data) => {
                $('.updatefullname').val(data.fullname);
                $('.updatework').val(data.position);
                $('.updateemail').val(data.email);
                $('.updateimage').val(data.imgUrl);
                $('.updateuserid').val(data._id);
            });

    }


    $('.update').click(() => {
        $fullname = $('.updatefullname').val();
        $email = $('.updateemail').val();
        $work = $('.updatework').val();
        $image = $('.updateimage').val();
        $id = $('.updateuserid').val()
        console.log($id)
        fetch('http://localhost:7000/user/update/' + $id, {
            method: 'POST',
            body: JSON.stringify({
                fullname: $fullname,
                position: $work,
                email: $email,
                imgUrl: $image,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        location.reload(true)
    })

})